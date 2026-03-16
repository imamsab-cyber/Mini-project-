import os

def analyze_log(file_path):
    """
    Analyzes a log file for common error and warning patterns.
    """
    if not os.path.exists(file_path):
        return f"Error: File '{file_path}' not found."
        
    results = {
        "errors": [],
        "warnings": [],
        "total_lines": 0
    }
    
    try:
        with open(file_path, 'r') as f:
            for line in f:
                results["total_lines"] += 1
                if "ERROR" in line.upper() or "CRITICAL" in line.upper() or "FAIL" in line.upper():
                    results["errors"].append(line.strip())
                elif "WARN" in line.upper() or "WARNING" in line.upper():
                    results["warnings"].append(line.strip())
                    
        return results
    except Exception as e:
        return f"Error reading file: {str(e)}"
