from django.forms import ModelForm
from django import forms
from django.contrib.auth.models import User



class ContactForm(forms.Form):
    visitor_name = forms.CharField(label='Your Name:', max_length=100)
    visitor_email = forms.EmailField(label='Your Email-Address:', max_length=100)
    visitor_subject = forms.CharField(label='Your Subject:', max_length=100)
    visitor_message = forms.CharField(label='Your Message:', widget=forms.Textarea)
