from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, DateField
from wtforms.validators import DataRequired, Email, ValidationError

class ProjectForm(FlaskForm):
    userId = StringField('userId', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
    fundingGoal = DecimalField('fundingGoal', validators=[DataRequired()])
    balance = DecimalField('balance', validators=[DataRequired()])
    image = StringField('image')
    dateGoal = DateField('dateGoal', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    # username = StringField('username', validators=[DataRequired()])
    # email = StringField('email', validators=[DataRequired(), user_exists])
    # password = StringField('password', validators=[DataRequired()])
