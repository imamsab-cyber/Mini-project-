# Cybersecurity Toolkit

This project contains a dual-interface cybersecurity toolkit:
1. **Web Dashboard**: A modern, React-based interface for interacting with security tools directly in the browser.
2. **Python CLI Toolkit**: A modular Python project designed to run locally in VS Code or any terminal.

## Features
- **Port Scanner**: Identify open ports on target hosts.
- **Password Strength Analyzer**: Evaluate password complexity.
- **Log File Analyzer**: Scan logs for critical errors and warnings.
- **Subdomain Finder**: Discover subdomains for a given domain.

## Project Structure
- `/src`: React source code for the web dashboard.
- `/python_toolkit`: Full source code for the Python CLI version.
  - `main.py`: Entry point for the CLI.
  - `modules/`: Core logic for each tool.
  - `utils/`: Utility functions for file management.
  - `README.md`: Detailed instructions for the Python version.

## How to use the Python Toolkit locally
1. Download or export the project.
2. Navigate to the `python_toolkit` directory.
3. Run `python main.py`.

## How to use the Web Dashboard
1. The web dashboard is running in the preview window.
2. Use the sidebar to navigate between different security modules.
3. View real-time output in the system console on the right.
