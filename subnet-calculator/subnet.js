document.getElementById('subnet-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const input = document.getElementById('ip-input').value.trim();
  const resultDiv = document.getElementById('result');

  const match = input.match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/);
  if (!match) {
    alert('Please enter a valid IP address in CIDR format, e.g. 192.168.1.1/24');
    return;
  }

  const ip = match[1];
  const cidr = parseInt(match[2], 10);

  if (cidr < 0 || cidr > 32) {
    alert('CIDR must be between 0 and 32.');
    return;
  }

  const ipParts = ip.split('.').map(Number);
  if (ipParts.some(part => part < 0 || part > 255)) {
    alert('Each part of the IP address must be between 0 and 255.');
    return;
  }

  const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
  const mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
  const wildcard = ~mask >>> 0;

  const network = ipInt & mask;
  const broadcast = network | wildcard;

  const firstIp = cidr === 32 ? ipInt : network + 1;
  const lastIp = cidr >= 31 ? broadcast : broadcast - 1;
  const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : (lastIp - firstIp + 1);

  function intToIp(int) {
    return [(int >>> 24), (int >> 16 & 255), (int >> 8 & 255), (int & 255)].join('.');
  }

  function maskToDecimal(mask) {
    return [(mask >>> 24), (mask >> 16 & 255), (mask >> 8 & 255), (mask & 255)].join('.');
  }

  // Populate the result section
  document.getElementById('network-address').textContent = intToIp(network);
  document.getElementById('broadcast-address').textContent = intToIp(broadcast);
  document.getElementById('first-ip').textContent = intToIp(firstIp);
  document.getElementById('last-ip').textContent = intToIp(lastIp);
  document.getElementById('host-count').textContent = usableHosts;
  document.getElementById('subnet-mask').textContent = maskToDecimal(mask);
  document.getElementById('wildcard-mask').textContent = maskToDecimal(wildcard);

  resultDiv.classList.remove('hidden');
});
