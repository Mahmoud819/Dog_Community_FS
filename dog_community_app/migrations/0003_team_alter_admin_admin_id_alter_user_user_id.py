# Generated by Django 4.1.2 on 2022-11-06 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dog_community_app', '0002_contactus_newsletter'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('member_id', models.IntegerField(primary_key=True, serialize=False)),
                ('full_name', models.CharField(max_length=255)),
                ('designation', models.CharField(max_length=255)),
            ],
        ),
        migrations.AlterField(
            model_name='admin',
            name='admin_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
