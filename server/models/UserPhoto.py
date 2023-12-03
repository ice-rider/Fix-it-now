from .db import db
from .Photo import PhotoModel

class UserPhotoModel(db.Model): 
    __tablename__ = "user_photo"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'))

    def json(self):
        """
        Returns a JSON representation of the object.

        :return: A dictionary containing the id and photo of the object.
        :rtype: dict
        """
        return {
            "id": self.id,
            "photo": PhotoModel.get_by_id(self.photo_id).json(),
        }

    @classmethod
    def get_by_id(cls, id):
        """
        Retrieves a user photo from the database based on the provided ID.

        Parameters:
            id (int): The ID of the user photo to retrieve.

        Returns:
            UserPhoto: The user photo object with the matching ID, or None if no matching photo is found.
        """
        photo = cls.query.filter_by(id=id).first()
        if photo:
            return photo.json()
        else:
            return "default"
