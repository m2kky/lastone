import { useState } from 'react';
import styles from '../pages/BookWorkshop/BookWorkshop.module.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/msword', // .doc
  'image/png',
  'image/jpeg',
  'image/jpg'
];

const ALLOWED_EXTENSIONS = ['.pdf', '.pptx', '.docx', '.doc', '.png', '.jpg', '.jpeg'];

export default function FileUpload({ onFilesChange, files = [] }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File "${file.name}" exceeds 10MB limit.`;
    }

    // Check MIME type or extension
    const isValidMime = ALLOWED_MIME_TYPES.includes(file.type);
    const isValidExtension = ALLOWED_EXTENSIONS.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isValidMime && !isValidExtension) {
      return `File "${file.name}" is not an allowed type. Allowed: PDF, PPTX, DOCX, PNG, JPG`;
    }

    return null;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const validFiles = [];
      
      newFiles.forEach(file => {
        const validationError = validateFile(file);
        if (validationError) {
          setError(prev => prev ? `${prev}\n${validationError}` : validationError);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError('');
    
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const validFiles = [];
      
      newFiles.forEach(file => {
        const validationError = validateFile(file);
        if (validationError) {
          setError(prev => prev ? `${prev}\n${validationError}` : validationError);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }
    }
    
    // Reset input to allow selecting the same file again
    e.target.value = '';
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    setError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={styles.fileUpload}>
      <label className={styles.label}>Attachments (optional)</label>
      <div 
        className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleChange}
          className={styles.fileInput}
          id="file-upload"
          accept=".pdf,.pptx,.docx,.doc,.png,.jpg,.jpeg"
          aria-describedby={error ? "file-error" : undefined}
        />
        <label htmlFor="file-upload" className={styles.fileLabel}>
          <span>Drop files here or click to browse</span>
          <small>PDF, PPTX, DOCX, PNG, JPG files up to 10MB</small>
        </label>
      </div>
      
      {error && (
        <div id="file-error" className={styles.errorText} role="alert">
          {error.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      )}
      
      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <span className={styles.fileName} title={file.name}>
                {file.name} ({formatFileSize(file.size)})
              </span>
              <button 
                type="button"
                onClick={() => removeFile(index)}
                className={styles.removeFile}
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}