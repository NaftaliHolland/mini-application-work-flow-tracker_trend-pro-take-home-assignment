from django.test import TestCase

from .models import Application
from .services import (add_reviewer_comment, start_application_review,
                       submit_application, update_application)


class UpdateApplicationTestCase(TestCase):

    def test_not_draft_raises(self):
        application = Application.objects.create(
            tracking_number="KSJDKFJ",
            applicant_name="John Doe",
            applicant_email="john@mail.com",
            company_name="Test Company",
            application_type="renewal",
            status="approved",
        )

        with self.assertRaises(Exception):
            update_application(application=application, data={"status": "draft"})


class SubmitApplicationTestCase(TestCase):
    def test_not_draft_raises(self):
        application = Application.objects.create(
            tracking_number="KSJDKFJ",
            applicant_name="John Doe",
            applicant_email="john@mail.com",
            company_name="Test Company",
            application_type="renewal",
            status="approved",
        )

        with self.assertRaises(Exception):
            submit_application(application=application)


class ReviewApplicationTestCase(TestCase):
        def test_application_not_submitted_raises(self):

            application = Application.objects.create(
            tracking_number="KSJDKFJ",
            applicant_name="John Doe",
            applicant_email="john@mail.com",
            company_name="Test Company",
            application_type="renewal",
            status="draft",
        )

            with self.assertRaises(Exception):
                start_application_review(application=application)

class ReviewerCommentTestCase(TestCase):
        def test_application_not_under_review_raises(self):

            application = Application.objects.create(
            tracking_number="KSJDKFJ",
            applicant_name="John Doe",
            applicant_email="john@mail.com",
            company_name="Test Company",
            application_type="renewal",
            status="draft",
        )

            with self.assertRaises(Exception):
                add_reviewer_comment(application=application, reviewer_comment="some dummy comment")

