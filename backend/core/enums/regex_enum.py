from enum import Enum


class RegexEnum(Enum):
    NAME = (
        r'^([A-Z][a-z]{0,29})([ -][A-Z][a-z]{0,29})*$',
        'Only alpha characters are allowed.'
    )
    SURNAME = (
        r'^([A-Z][a-z]{0,29})([ -][A-Z][a-z]{0,29})*$',
        'Only alpha characters are allowed.'
    )
    PHONE_NUMBER = (
        r'^(?:\+46|0046|0)7\d{8}$',
        'Enter a valid Swedish mobile number. Allowed formats: +46701234567, +46700000000, or 0701234567.'
    )
    STREET = (
        r'^([A-Z][a-z]{0,29}\.?)([ -][A-Z][a-z]{0,29}\.?)*$',
        'Only alpha characters are allowed.'
    )
    HOUSE = (
        r'^[\dA-Za-z\s\-\/]*$',
        'House number may contain letters, digits, spaces, dashes, or slashes.'
    )
    CITY = (
        r'^([A-Z][a-z]{0,29})([ -][A-Z][a-z]{0,29})*$',
        'Only alpha characters are allowed.'
    )
    REGION = (
        r'^([A-Z][a-z]{0,29})([ -][A-Z][a-z]{0,29})*$',
        'Only alpha characters are allowed.'
    )
    COUNTRY = (
        r'^([A-Z][a-z]{0,29})([ -][A-Z][a-z]{0,29})*$',
        'Only alpha characters are allowed.'
    )
    PASSWORD = (
        r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
        "Password must be at least 8 characters long, contain an uppercase letter - 'A', "
        "a lowercase letter - 'a', a digit - '1', and a special character - '@'."
    )


    def __init__(self, pattern:str, msg:str):
        self.pattern = pattern
        self.msg = msg