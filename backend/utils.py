from django.utils.crypto import get_random_string

from application.models import Application


def generate_random_string(length: int) -> str:

    # NOTE: I really don't think this is a good way of handling this but will do for now
    # How do I even test this???


    while True:
        random_string = get_random_string(length=length)
        exists = Application.objects.filter(tracking_number=random_string)
        if not exists:
            return random_string
