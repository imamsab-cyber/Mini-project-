import socket

def find_subdomains(domain, subdomains_list):
    """
    Attempts to resolve subdomains for a given domain.
    """
    found_subdomains = []
    print(f"\n[*] Searching subdomains for: {domain}")
    
    for sub in subdomains_list:
        url = f"{sub}.{domain}"
        try:
            ip = socket.gethostbyname(url)
            print(f"[+] Found: {url} ({ip})")
            found_subdomains.append(f"{url} ({ip})")
        except socket.gaierror:
            pass
            
    return found_subdomains
