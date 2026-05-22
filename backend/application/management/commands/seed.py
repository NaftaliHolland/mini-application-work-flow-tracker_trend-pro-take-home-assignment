import random
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone
from utils import generate_random_string

from application.models import Application

class Command(BaseCommand):
    help = "Seed dummy application data"

    FIRST_NAMES = [
        "John",
        "Jane",
        "Michael",
        "Sarah",
        "David",
        "Emily",
        "Daniel",
        "Grace",
    ]

    LAST_NAMES = [
        "Smith",
        "Johnson",
        "Brown",
        "Williams",
        "Miller",
        "Davis",
        "Wilson",
        "Taylor",
    ]

    COMPANIES = [
        "TechNova Ltd",
        "GreenFields Inc",
        "BlueWave Solutions",
        "Prime Holdings",
        "Skyline Ventures",
        "UrbanCore Group",
        "NextGen Systems",
        "VisionCraft Ltd",
    ]

    DESCRIPTIONS = [
        "Application submitted for regulatory approval.",
        "Request for renewal of existing registration.",
        "Change of ownership documentation attached.",
        "Updated company information provided.",
        "Discontinuation request awaiting review.",
    ]

    APPLICATION_TYPES = [
        "recordation",
        "renewal",
        "change_of_ownership",
        "change_of_name",
        "discontinuation",
    ]

    STATUSES = [
        "draft",
        "submitted",
        "under_review",
        "need_more_information",
        "approved",
        "rejected",
    ]

    REVIEW_COMMENTS = [
        "Looks good.",
        "Additional documents required.",
        "Approved after review.",
        "Rejected due to incomplete information.",
        "Pending clarification from applicant.",
    ]

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=20,
            help="Number of applications to create",
        )

    def handle(self, *args, **options):
        count = options["count"]

        applications = []

        for i in range(count):
            first_name = random.choice(self.FIRST_NAMES)
            last_name = random.choice(self.LAST_NAMES)

            applicant_name = f"{first_name} {last_name}"
            applicant_email = (
                f"{first_name.lower()}.{last_name.lower()}{i}@example.com"
            )

            status = random.choice(self.STATUSES)

            created_at = timezone.now() - timedelta(
                days=random.randint(1, 90)
            )

            submitted_at = None
            reviewed_at = None

            if status != "draft":
                submitted_at = created_at + timedelta(
                    days=random.randint(1, 5)
                )

            if status in ["approved", "rejected", "under_review"]:
                reviewed_at = submitted_at + timedelta(
                    days=random.randint(1, 10)
                )

            applications.append(
                Application(
                    tracking_number=generate_random_string(5),
                    applicant_name=applicant_name,
                    applicant_email=applicant_email,
                    company_name=random.choice(self.COMPANIES),
                    application_type=random.choice(self.APPLICATION_TYPES),
                    description=random.choice(self.DESCRIPTIONS),
                    status=status,
                    reviewer_comment=(
                        random.choice(self.REVIEW_COMMENTS)
                        if status != "draft"
                        else ""
                    ),
                    submitted_at=submitted_at,
                    reviewed_at=reviewed_at,
                    created_at=created_at,
                    updated_at=timezone.now(),
                )
            )

        Application.objects.bulk_create(applications)

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully created {count} applications"
            )
        )
