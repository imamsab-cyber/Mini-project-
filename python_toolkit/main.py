import sys
import os

# Add the current directory to sys.path to allow imports from modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from modules.port_scanner import scan_ports
from modules.password_analyzer import analyze_password
from modules.log_analyzer import analyze_log
from modules.subdomain_finder import find_subdomains
from utils.file_manager import save_to_file

def main_menu():
    while True:
        print("\n" + "="*30)
        print(" CYBERSECURITY TOOLKIT")
        print("="*30)
        print("1. Port Scanner")
        print("2. Password Strength Analyzer")
        print("3. Log File Analyzer")
        print("4. Subdomain Finder")
        print("5. Exit")
        print("="*30)
        
        choice = input("Select an option (1-5): ")
        
        if choice == '1':
            target = input("Enter target IP or hostname: ")
            ports_str = input("Enter ports to scan (comma separated, e.g., 80,443,22): ")
            ports = [int(p.strip()) for p in ports_str.split(',') if p.strip().isdigit()]
            results = scan_ports(target, ports)
            if results:
                save = input("Save results to file? (y/n): ")
                if save.lower() == 'y':
                    print(save_to_file(f"port_scan_{target}.txt", results))
                    
        elif choice == '2':
            password = input("Enter password to analyze: ")
            results = analyze_password(password)
            print(f"\nStrength: {results['strength']}")
            print(f"Score: {results['score']}/5")
            if results['feedback']:
                print("Feedback:")
                for f in results['feedback']:
                    print(f" - {f}")
            
            save = input("\nSave results to file? (y/n): ")
            if save.lower() == 'y':
                print(save_to_file("password_analysis.txt", results))
                
        elif choice == '3':
            file_path = input("Enter path to log file: ")
            results = analyze_log(file_path)
            if isinstance(results, dict):
                print(f"\nTotal lines: {results['total_lines']}")
                print(f"Errors found: {len(results['errors'])}")
                print(f"Warnings found: {len(results['warnings'])}")
                
                show = input("Show errors? (y/n): ")
                if show.lower() == 'y':
                    for e in results['errors']:
                        print(f" [!] {e}")
                
                save = input("\nSave results to file? (y/n): ")
                if save.lower() == 'y':
                    print(save_to_file("log_analysis.txt", results))
            else:
                print(results)
                
        elif choice == '4':
            domain = input("Enter domain (e.g., google.com): ")
            # Default common subdomains for demonstration
            common_subs = ['www', 'mail', 'ftp', 'localhost', 'dev', 'staging', 'api']
            results = find_subdomains(domain, common_subs)
            if results:
                save = input("Save results to file? (y/n): ")
                if save.lower() == 'y':
                    print(save_to_file(f"subdomains_{domain}.txt", results))
                    
        elif choice == '5':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main_menu()
