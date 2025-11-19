from flask import Blueprint, jsonify, request, current_app
from app.models import Users, EOD
from app.extensions import db
from flask_login import current_user
from datetime import datetime, timedelta

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


@reader.route("/eods_by_user/<int:user_id>", methods=["GET"])
def eods_by_user(user_id):
    eods = EOD.query.filter_by(user_id=user_id).all()
    if not eods:
        return jsonify(success=False, message="No EODs found for this user"), 400
    return jsonify(success=True, eods=[e.serialize() for e in eods]), 200


@reader.route("/eod_by_date_range", methods=["GET"])
def eod_by_date_range():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    user_id = request.args.get("user_id", type=int)
    
    if not start_date or not end_date:
        return jsonify(success=False, message="Both start_date and end_date are required"), 400
    
    try:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        
        q = EOD.query.filter(EOD.date.between(start_date, end_date))
        if user_id:
            q = q.filter(EOD.user_id == user_id)
            
        q = q.order_by(EOD.date.desc())
            
        eods = q.all()
        
        return jsonify(success=True, eods=[e.serialize() for e in eods]), 200
    except Exception as e:
        current_app.logger.error(f"[EOD ERROR]: {str(e)}")
        return jsonify(success=False, message="An error occurred while querying EODs"), 500


@reader.route("/run_report/<int:id>/<date>", methods=["GET"])
def run_report(id, date):
    date = datetime.strptime(date, "%Y-%m-%d").date()
    
    eods = EOD.query.filter(EOD.date == date, EOD.user_id == id).all()
    if not eods:
        return jsonify(success=False, message="No EOD's match this query"), 400
    
    
    totals = {
        "total_sales": 0,
        "total_units": 0,
        "new_appliance_sales": 0,
        "used_appliance_sales": 0,
        "extended_warranty_sales": 0,
        "diagnostic_fees": 0,
        "in_shop_repairs": 0,
        "service_sales": 0,
        "parts_sales": 0,
        "ebay_sales": 0,
        "delivery": 0,
        "card": 0,
        "cash": 0,
        "checks": 0,
        "acima": 0,
        "tower_loan": 0,
        "misc_deductions": 0,
        "cash_deposits": 0,
        "refunds": 0,
        "ebay_returns": 0,
    }
    for e in eods:
        totals["total_sales"] += e.sub_total
        totals["total_units"] += e.units
        totals["new_appliance_sales"] += e.new
        totals["used_appliance_sales"] += e.used
        totals["extended_warranty_sales"] += e.extended_warranty
        totals["diagnostic_fees"] += e.diagnostic_fees
        totals["in_shop_repairs"] += e.in_shop_repairs
        totals["service_sales"] += e.service
        totals["parts_sales"] += e.parts
        totals["ebay_sales"] += e.ebay_sales
        totals["delivery"] += e.delivery
        totals["card"] += e.card
        totals["cash"] += e.cash
        totals["checks"] += e.checks
        totals["acima"] += e.acima
        totals["tower_loan"] += e.tower_loan
        totals["misc_deductions"] += e.misc_deductions
        totals["cash_deposits"] += e.cash_deposits
        totals["refunds"] += e.refunds
        totals["ebay_returns"] += e.ebay_returns
        
    return jsonify(success=True, totals=totals), 200