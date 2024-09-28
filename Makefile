# Define your virtual environment and flask app
VENV = myenv
FLASK_APP = app.py

# Install dependencies
install:
	python3 -m venv $(VENV)
	@pip install -r requirements.txt

# Run the web application

#TODO Need to change this
run:
	FLASK_APP=$(FLASK_APP) FLASK_ENV=development ./$(VENV)/bin/flask run --port 3000

# Clean up virtual environment
clean:
	rm -rf $(VENV)

# Reinstall all dependencies
reinstall: clean install