from datetime import date

from ninja import ModelSchema, Schema

from .models import Application


class ApplicationCreateIn(Schema):
    applicant_name: str
    applicant_email: str
    application_type: str
    description: str | None = None

class ApplicationUpdate(Schema):
    applicant_name: str = ""
    applicant_email: str = ""
    company_name: str = ""
    application_type: str = ""
    description: str = ""
    status: str = ""

class ApplicationOut(ModelSchema):
    class Meta:
        model = Application
        fields = [
            "id",
            "tracking_number",
            "applicant_name",
            "applicant_email",
            "company_name",
            "application_type",
            "description",
            "status",
            "reviewer_comment",
            "created_at",
            "updated_at",
            "submitted_at",
            "reviewed_at"
        ]

class ReviewSchema(Schema):
    reviewer_comment: str
