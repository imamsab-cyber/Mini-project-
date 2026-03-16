# Cybersecurity Toolkit (Python CLI)

A modular Python-based toolkit for basic cybersecurity tasks.

## Features
1. **Port Scanner**: Checks common ports on a target host to see if they are open.
2. **Password Strength Analyzer**: Evaluates passwords based on length and complexity.
3. **Log File Analyzer**: Scans log files for ERROR and WARNING keywords.
4. **Subdomain Finder**: Attempts to resolve common subdomains for a given domain.

## Project Structure
```
python_toolkit/
├── main.py                 # Main CLI entry point
├── modules/                # Core logic modules
│   ├── port_scanner.py
│   ├── password_analyzer.py
│   ├── log_analyzer.py
│   └── subdomain_finder.py
├── utils/                  # Utility functions
│   └── file_manager.py
├── results/                # Directory where scan results are saved
├── requirements.txt        # Dependencies (none for basic version)
└── README.md               # Documentation
```

## How to Run in VS Code

1. **Open Folder**: Open the `python_toolkit` folder in VS Code.
2. **Open Terminal**: Press ``Ctrl+` `` (or `Cmd+` on Mac) to open the integrated terminal.
3. **Run Script**: Type the following command and press Enter:
   ```bash
   python main.py
   ```
4. **Follow Prompts**: Use the numeric menu to select a tool and follow the on-screen instructions.

## Requirements
- Python 3.x installed on your system.
- No external libraries are required as it uses Python standard libraries.
