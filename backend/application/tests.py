from django.test import TestCase

from .models import Application
from .services import update_application, submit_application


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

