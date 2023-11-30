from flask_restful import reqparse

auth_parser = reqparse.RequestParser()
auth_parser.add_argument('login',    type=str, required=True, help="This field cannot be blank.", location="json")
auth_parser.add_argument('password', type=str, required=True, help="This field cannot be blank.", location="json")
"""
    This parser is used to parse the authentication request data.

    Parameters:
    - login (str): The login of the user.
    - password (str): The password of the user.

    Returns:
    - argparse.Namespace: The parsed arguments.
"""

post_ticket_parser = reqparse.RequestParser()
post_ticket_parser.add_argument('teacher_id',  type=int, required=True, help="This field cannot be blank.", location="json")
post_ticket_parser.add_argument('title',       type=str, required=True, help="This field cannot be blank.", location="json")
post_ticket_parser.add_argument('subtitle',    type=str, required=True, help="This field cannot be blank.", location="json")
post_ticket_parser.add_argument('description', type=str, required=True, help="This field cannot be blank.", location="json")
post_ticket_parser.add_argument('location',    type=str, required=True, help="This field cannot be blank.", location="json")
"""
    This parser is used to parse the post ticket request data.

    Parameters:
    - teacher_id (int): The id of the teacher.
    - title (str): The title of the ticket.
    - subtitle (str): The subtitle of the ticket.
    - description (str): The description of the ticket.
    - location (str): The location of the ticket.

    Returns:
    - argparse.Namespace: The parsed arguments.
"""
