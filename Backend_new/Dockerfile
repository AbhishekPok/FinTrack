FROM python:3.11-slim-bookworm

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Create a non-root user
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup fsuser

# Set work directory
WORKDIR /app

# Install dependencies
# Copy only requirements first to leverage cache
COPY requirements/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files and chown to non-root user
COPY --chown=fsuser:appgroup . /app/

# Switch to non-root user
USER fsuser

# Expose port
EXPOSE 8000

# Default command
CMD ["python", "fintrack_backend/manage.py", "runserver", "0.0.0.0:8000"]
