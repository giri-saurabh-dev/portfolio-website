const fileInput = document.getElementById("fileInput");
const output = document.getElementById("output");
const loader = document.getElementById("loader");

// Load from local legit_ips.json (manually downloaded from Microsoft feed)
const MICROSOFT_IP_JSON_URL = "./legit-ips.json";

let legitIPs = [];

// Fetch and flatten all legit IPs from Microsoft JSON
async function fetchLegitIPs() {
  loader.classList.remove("hidden");
  try {
    const res = await fetch(MICROSOFT_IP_JSON_URL);
    const data = await res.json();
    const ips = [];

    data.forEach(entry => {
      if (entry.ips) {
        ips.push(...entry.ips);
      }
    });

    legitIPs = flattenCIDRs(ips);
  } catch (err) {
    output.innerHTML = `<p style="color:red">❌ Failed to fetch legit IPs</p>`;
    console.error(err);
  } finally {
    loader.classList.add("hidden");
  }
}

// Convert CIDR blocks like "13.107.6.0/24" into individual IPs
function flattenCIDRs(cidrList) {
  const ranges = [];
  cidrList.forEach(cidr => {
    if (!cidr.includes('/')) {
      ranges.push(cidr);
    } else {
      const [base, bits] = cidr.split('/');
      const mask = ~(2 ** (32 - parseInt(bits)) - 1);
      const baseInt = ipToInt(base);
      const end = baseInt | ~mask;

      for (let i = baseInt; i <= end; i++) {
        ranges.push(intToIp(i));
      }
    }
  });
  return ranges;
}

function ipToInt(ip) {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
}

function intToIp(int) {
  return [24, 16, 8, 0].map(shift => (int >> shift) & 255).join('.');
}

// Handle uploaded netstat file
function handleFileRead(event) {
  const text = event.target.result;
  const lines = text.split('\n');
  const tableRows = [];

  lines.forEach(line => {
    // Match both IPv4 addresses in a line (local + foreign)
    const matches = line.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g);
    if (matches && matches.length >= 2) {
      const ip = matches[1]; // Foreign/Remote IP

      // Ignore local/private IPs
      if (
        ip.startsWith("127.") ||
        ip.startsWith("0.") ||
        ip.startsWith("192.168.") ||
        ip.startsWith("10.") ||
        ip.startsWith("172.")
      ) return;

      const isLegit = legitIPs.includes(ip);
      const rowClass = isLegit ? "safe" : "rogue";

      tableRows.push(`
        <tr class="${rowClass}">
          <td data-label="IP">${ip}</td>
          <td data-label="Status">${isLegit ? "✅ Safe (Microsoft)" : "🚨 Unknown / Rogue"}</td>
        </tr>
      `);
    }
  });

  output.innerHTML = tableRows.length
    ? `
      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${tableRows.join("")}</tbody>
      </table>
    `
    : "<p>No valid external IPs found in the file. Check your netstat output.</p>";
}

// Trigger logic on file upload
fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (legitIPs.length === 0) await fetchLegitIPs();

  const reader = new FileReader();
  reader.onload = handleFileRead;
  reader.readAsText(file);
});
