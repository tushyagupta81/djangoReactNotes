from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # serializer looks through all the fields in the model(the user model from django) and
        # valiadates the data for us as it is mentioned in the model.
        # so what we get now to validated_data
        model = User
        fields = ["id", "username", "password"]
        # password is not to be read or returned
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
