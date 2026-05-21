from django.shortcuts import get_object_or_404

from .models import Application


class OperationNotAllowedException(Exception):
    # I have this so that I can catch a less general Exception in the route handler and return a 400 instead of a 500
    pass


class NeedsCommentException(Exception):
    pass

def update_application(application: Application, data: dict) -> Application:

    if application.status in ["approved", "rejected"]:
        raise OperationNotAllowedException("Approved or Rejected applications can not be edited")

    if data.get("status") == "need_more_information" and not data.get("reviewer_comment"):
        raise NeedsCommentException("applications that need more information needs a comment")

    if data.get("status") == "rejected" and not data.get("reviewer_comment"):
        raise NeedsCommentException("rejected applications needs a comment")

    for attr, value in data.items():
        setattr(application, attr, value)

    application.save()
    return application

def submit_application(application: Application) -> Application:

    if application.status != "draft":
        raise OperationNotAllowedException("Only draft applications can be submitted")

    application.status = "submitted"

    application.save(update_fields=["status"])

    return application

def start_application_review(application: Application) -> Application:
    if application.status != "submitted":
        raise OperationNotAllowedException("Only submitted applications can be reviewed")

    application.status = "under_review"

    application.save(update_fields=["status"])

    return application

def add_reviewer_comment(application: Application, reviewer_comment: str) -> Application:
    if application.status != "under_review":
        raise OperationNotAllowedException("Only applications under review can be can be reviewed")

    application.reviewer_comment = reviewer_comment

    application.save(update_fields=["reviewer_comment"])

    return application
