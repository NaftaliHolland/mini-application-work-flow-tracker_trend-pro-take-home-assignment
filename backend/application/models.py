from django.db import models


class Application(models.Model):
    APPLICATION_TYPE_CHOICES = [
        ("recordation", "Recordation"),
        ("renewal", "Renewal"),
        ("change_of_ownership", "Change of Ownership"),
        ("change_of_name", "Change of Name"),
        ("discontinuation", "Discontinuation"),
    ]
    APPLICATION_STATUS_CHOICES = [
        ("draft", "Draft"),
        ("submitted", "Submitted"),
        ("under_review", "Under Review"),
        ("need more information", "Need More Information"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    tracking_number = models.CharField(max_length=100, unique=True)
    applicant_name = models.CharField(max_length=255)
    applicant_email = models.EmailField()
    company_name = models.CharField(max_length=255)
    application_type = models.CharField(max_length=50, choices=APPLICATION_TYPE_CHOICES)
    description = models.TextField(null=True)
    status = models.CharField(max_length=50, choices=APPLICATION_STATUS_CHOICES, default="draft")
    reviewer_comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    submitted_at = models.DateTimeField(blank=True, null=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)
