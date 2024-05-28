# models.py
"""
This file contains the database models.
"""
from sqlalchemy import Column, Integer, String, TIMESTAMP, text
from sqlalchemy.sql import func 
from database import Base

class PDFDocument(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    filename = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
