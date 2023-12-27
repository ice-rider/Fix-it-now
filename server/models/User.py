from flask import abort
from enum import Enum
from passlib.hash import pbkdf2_sha256

from .db import db


class UserRole(Enum):
    ADMIN = "admin"
    WORKER = "worker"
    TEACHER = "teacher"

class UserModel(db.Model): 
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))
    login = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(100))
    role = db.Column(db.Enum(UserRole))
    avatar = db.Column(db.String, default="no-avatar")

    def json(self):
        """
        Returns a JSON representation of the object.

        :return: A dictionary containing the ID, username, role, and avatar of the object.
        :rtype: dict
        """
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role.value,
            "avatar": self.avatar
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
        user = cls.query.filter_by(login=login).get_or_404()

        if not user:
            abort(404, "User not found")

        if pbkdf2_sha256.verify(password, user.password):
            return user
        else:
            abort(401, "Invalid credentials")


    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)
