from flask import Blueprint, jsonify, request, current_app
from app.models import Users, EOD
from app.extensions import db
from flask_login import current_user, login_required
from datetime import datetime

deleter = Blueprint("delete", __name__)

@deleter.route("/delete_eod/<int:id>", methods=["DELETE"])
@login_required
def delete_eod(id):
    eod = EOD.query.get(id)
    if not eod:
        current_app.logger.error(f"[EOD ERROR]: Could not locate EOD with ID {id} for deletion")
        return jsonify(success=False, message="Could not find EOD to delete"), 400  
    db.session.delete(eod)
    db.session.commit()
    current_app.logger.info(f"{current_user.first_name} deleted EOD {id}")
    return jsonify(success=True, message="EOD deleted successfully"), 200

@deleter.route("/delete_user/<int:id>", methods=["DELETE"])
@login_required
def delete_user(id):
    user = Users.query.get(id)
    if not user:
        return jsonify(success=False, message="Could not find user to delete"), 400
    db.session.delete(user)
    db.session.commit()
    current_app.logger.info(f"{current_user.first_name} deleted user {user.username}")
    return jsonify(success=True, message="User deleted successfully"), 200