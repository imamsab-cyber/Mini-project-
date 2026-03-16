import re

def analyze_password(password):
    """
    Analyzes the strength of a password based on length and complexity.
    """
    score = 0
    feedback = []
    
    # Length check
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Password is too short (min 8 characters).")
        
    # Uppercase check
    if re.search(r"[A-Z]", password):
        score += 1
    else:
        feedback.append("Missing uppercase letter.")
        
    # Lowercase check
    if re.search(r"[a-z]", password):
        score += 1
    else:
        feedback.append("Missing lowercase letter.")
        
    # Number check
    if re.search(r"\d", password):
        score += 1
    else:
        feedback.append("Missing number.")
        
    # Special character check
    if re.search(r"[ !@#$%^&*(),.?\":{}|<>]", password):
        score += 1
    else:
        feedback.append("Missing special character.")
        
    strength = "Weak"
    if score == 5:
        strength = "Very Strong"
    elif score >= 4:
        strength = "Strong"
    elif score >= 3:
        strength = "Moderate"
        
    return {
        "score": score,
        "strength": strength,
        "feedback": feedback
    }
