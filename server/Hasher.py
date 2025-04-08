from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()

# Hash passwords
admin_hash = bcrypt.generate_password_hash("jbchadmin").decode('utf-8')
employee_hash = bcrypt.generate_password_hash("jbch0691").decode('utf-8')

print("Admin password hash:", admin_hash)
print("Employee password hash:", employee_hash)
