from flask import Blueprint, jsonify, request, current_app
from app.models import Users, EOD
from app.extensions import db
from flask_login import current_user
from datetime import datetime

reader = Blueprint("read", __name__)

@reader.route("/get_user/<int:id>", methods=["GET"])
def get_user(id):
    user = Users.query.get(id)
    if not user:
        return jsonify(success=False, message="Could not find user in database"), 400
    return jsonify(success=True, user=user.serialize()), 200

@reader.route("/get_users", methods=["GET"])
def get_users():
    users = Users.query.all()
    if not users:
        return jsonify(success=False, message="No users found."), 400
    return jsonify(success=True, users=[u.serialize() for u in users]), 200

@reader.route("/get_eod/<int:id>", methods=["GET"])
def get_eod(id):
    eod = EOD.query.get(id)
    if not eod:
        current_app.logger.error(f"[EOD ERROR]: Could not locate EOD with ID {id}")
        return jsonify(success=False, message="Could not query EOD"), 400
    current_app.logger.info(f"{current_user.first_name} queried for EOD {id}")
    return jsonify(success=True, eod=eod.serialize()), 200

@reader.route("/get_eod_by_ticket/<int:ticket_number>", methods=["GET"])
def get_eod_by_ticket(ticket_number):
    eod = EOD.query.filter_by(ticket_number=ticket_number).first()
    if not eod:
        current_app.logger.error(f"[EOD ERROR]: Could not locate EOD with Ticket Number {ticket_number}")
        return jsonify(success=False, message="Could not query EOD by ticket number"), 400
    current_app.logger.info(f"{current_user.first_name} queried for EOD with Ticket Number {ticket_number}")
    return jsonify(success=True, eod=eod.serialize()), 200

@reader.route("/get_all_eods", methods=["GET"])
def get_all_eods():
    eods = EOD.query.all()
    if not eods:
        current_app.logger.error(f"[EOD ERROR]: Could not locate EOD with ID {id}")
        return jsonify(success=False, message="EOD's not found"), 400
    return jsonify(success=True, eods=[e.serialize() for e in eods]), 200

@reader.route("/eod_by_date_range", methods=["POST"])
def eod_by_date_range():
    data = request.get_json()
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    
    if not start_date or not end_date:
        return jsonify(success=False, message="Both start_date and end_date are required"), 400
    
    start = datetime.strptime(start_date, "%Y-%m-%d").date()
    end = datetime.strptime(end_date, "%Y-%m-%d").date()
    
    eods = EOD.query.filter(EOD.date.between(start, end)).all()
    
    return jsonify(success=True, eods=[e.serialize() for e in eods]), 200

@reader.route("/eods_by_user/<int:user_id>", methods=["GET"])
def eods_by_user(user_id):
    eods = EOD.query.filter_by(user_id=user_id).all()
    if not eods:
        return jsonify(success=False, message="No EODs found for this user"), 400
    return jsonify(success=True, eods=[e.serialize() for e in eods]), 200