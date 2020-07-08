from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .forms import ContactForm
from django.contrib import messages
import os

# Create your views here.

def about(request):
    return render(request, 'general/about.html')

def landing(request):

    form = ContactForm()

    email_user = os.environ.get('DJANGO_EMAIL_USER')
    email_password = os.environ.get('DJANGO_EMAIL_PASSWORD')

    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():

            visitor_name = form.cleaned_data.get('visitor_name')
            visitor_email = form.cleaned_data.get('visitor_email')
            visitor_subject = form.cleaned_data.get('visitor_subject')
            visitor_message = form.cleaned_data.get('visitor_message')

            #email_body = render_to_string('contact_email.html',
            #    {'name':visitor_name,
            #     'subject':visitor_subject,
            #     'email':visitor_email,
            #     'message':visitor_message
            #     })

            print(email_user)
            print(email_password)
            email_body = 'This is my email body'

            send_mail(
                'Contact Request',
                email_body,
                email_user,
                ['tantris.kast@gmail.com'],
                fail_silently=False)

            messages.success(request, 'Your Email was successfully sent!')
            return redirect('landing')

    context = {'form':form}

    return render(request, 'general/landing.html', context)
