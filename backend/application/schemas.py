from datetime import date
from typing import Optional

from ninja import ModelSchema, Schema

from .models import Application


class ApplicationCreateIn(Schema):
    applicant_name: str
    applicant_email: str
    application_type: str
    description: str | None = None

class ApplicationUpdate(Schema):
    applicant_name: str | None = None
    applicant_email: str | None = None
    company_name: str | None = None
    application_type: str | None = None
    description: str | None = None
    status: str | None = None
    reviewer_comment: str | None = None

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
