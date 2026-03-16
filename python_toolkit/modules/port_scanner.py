import socket
from datetime import datetime

def scan_ports(target, ports):
    """
    Scans a list of ports on a target host.
    """
    results = []
    print(f"\n[*] Starting scan on host: {target}")
    print(f"[*] Time started: {datetime.now()}")
    
    try:
        for port in ports:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            socket.setdefaulttimeout(1)
            
            result = s.connect_ex((target, port))
            if result == 0:
                status = f"Port {port}: Open"
                print(f"[+] {status}")
                results.append(status)
            s.close()
            
    except KeyboardInterrupt:
        print("\n[!] Scan interrupted by user.")
        return results
    except socket.gaierror:
        print("\n[!] Hostname could not be resolved.")
        return results
    except socket.error:
        print("\n[!] Could not connect to server.")
        return results
        
    print(f"[*] Scan finished at: {datetime.now()}")
    return results
