import os

def save_to_file(filename, content):
    """
    Saves content to a file in the 'results' directory.
    """
    if not os.path.exists('results'):
        os.makedirs('results')
        
    filepath = os.path.join('results', filename)
    try:
        with open(filepath, 'w') as f:
            if isinstance(content, list):
                f.write('\n'.join(content))
            elif isinstance(content, dict):
                for key, value in content.items():
                    f.write(f"{key}: {value}\n")
            else:
                f.write(str(content))
        return f"Results saved to {filepath}"
    except Exception as e:
        return f"Error saving to file: {str(e)}"
