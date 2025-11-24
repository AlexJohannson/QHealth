from django.urls.base import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from apps.patient_recipe.models import PatientRecipeModel
from apps.users.models import ProfileModel, UserModel


class PatientRecipeTestApi(APITestCase):
    def setUp(self):
        self.patient1 = UserModel.objects.create(
            email='patientone@testone.com',
            password='patientpassword'
        )
        self.patient1.profile = ProfileModel.objects.create(
            user=self.patient1,
            name="John",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Malmo",
            region="Skone",
            country="Sweden",
            gender="Male"
        )
        self.recipe1 = PatientRecipeModel.objects.create(
            user=self.patient1,
            recipe='MMMMMMMM',
            description='PPPPPPPPPP'
        )

        self.patient2 = UserModel.objects.create(
            email='patienttwo@testone.com',
            password='patientpassword'
        )
        self.patient2.profile = ProfileModel.objects.create(
            user=self.patient2,
            name="John",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Malmo",
            region="Skone",
            country="Sweden",
            gender="Male"
        )
        self.recipe2 = PatientRecipeModel.objects.create(
            user=self.patient2,
            recipe='MMMMMMMM',
            description='PPPPPPPPPP'
        )

        self.patient3 = UserModel.objects.create(
            email='patientthree@testone.com',
            password='patientpassword'
        )
        self.patient3.profile = ProfileModel.objects.create(
            user=self.patient3,
            name="John",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Malmo",
            region="Skone",
            country="Sweden",
            gender="Male"
        )
        self.recipe3 = PatientRecipeModel.objects.create(
            user=self.patient3,
            recipe='MMMMMMMM',
            description='PPPPPPPPPP'
        )

    def _authenticate(self):
        user = UserModel.objects.create_user(
            email='admin@create.com',
            password='AdminNQ@!1'
        )
        user.is_active = True
        user.is_superuser = False
        user.is_staff = True
        user.save()
        res = self.client.post(reverse('auth_login'), {'email': user.email, 'password': 'AdminNQ@!1'})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])
        

    def test_get_all_patients_recipes(self):
        self._authenticate()
        res = self.client.get(reverse('patient-recipe-list-create'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 3)

    def test_create_new_patient_recipe(self):
        self._authenticate()
        res = self.client.post(
            reverse('patient-recipe-list-create'),
            data={
                'user_id': self.patient1.id,
                'recipe': 'New Patient Recipe',
                'description': 'New Patient Recipe'
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['recipe'], 'New Patient Recipe')
        self.assertEqual(res.data['description'], 'New Patient Recipe')

    def test_get_patient_recipe_by_id(self):
        self._authenticate()
        res = self.client.get(reverse(
            'patient-recipe-retrieve-update',
            kwargs={'pk': self.recipe1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_patient_recipe_by_id(self):
        self._authenticate()
        res = self.client.delete(reverse(
            'patient-recipe-retrieve-update',
            kwargs={'pk': self.recipe1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
