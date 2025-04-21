const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    console.log("🧪 Checking role... Required:", requiredRole, " | User's Role:", req.userRole);  // <-- MUST SHOW

    if (req.userRole !== requiredRole) {
      return res.status(403).json({ message: "Unknown role. Contact admin." });
    }

    next();
  };
};

export default verifyRole;

  
  
  
  