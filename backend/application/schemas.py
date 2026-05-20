from datetime import date

from ninja import Schema


class ApplicationCreateIn(Schema):
    applicant_name: str
    applicant_email: str
    application_type: str
    description: str = None
