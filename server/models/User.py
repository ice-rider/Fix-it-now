from enum import Enum
from passlib.hash import pbkdf2_sha256

from .db import db
from .UserPhoto import UserPhotoModel


class UserRole(Enum):
    ADMIN = "admin"
    WORKER = "worker"
    TEACHER = "teacher"

class UserModel(db.Model): 
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    login = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    role = db.Column(db.Enum(UserRole))
    avatar_id = db.Column(db.Integer, db.ForeignKey('user_photo.id'))

    def json(self):
        """
        Returns a JSON representation of the object.

        :return: A dictionary containing the ID, username, role, and avatar of the object.
        :rtype: dict
        """
        avatar = lambda id: (photo := UserPhotoModel.get_by_id(id)) and photo.json() or "default"

        return {
            "id": self.id,
            "username": self.username,
            "role": self.role.value,
            "avatar": avatar(self.avatar_id)
        }
    
    def secure_json(self):
        """
        Generate and return a secure JSON object containing the user's ID, login, username, and role.

        :return: A dictionary representing the secure JSON object.
        """
        return {
            "id": self.id,
            "login": self.login,
            "username": self.username,
            "role": self.role.value
        }
    
    @classmethod
    def auth(cls, login, password):
        user = cls.query.filter_by(login=login).first()
        if user and pbkdf2_sha256.verify(password, user.password):
            return user
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)