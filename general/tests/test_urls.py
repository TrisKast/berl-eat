from django.test import SimpleTestCase
from django.urls import reverse, resolve
from general.views import landing, about

class TestUrls(SimpleTestCase):

    def test_landing_url_is_resolved(self):
        url = reverse('landing')
        self.assertEquals(resolve(url).func, landing)

    def test_about_url_is_resolved(self):
        url = reverse('about')
        self.assertEquals(resolve(url).func, about)
