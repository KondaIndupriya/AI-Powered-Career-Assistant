import { FileText, UploadCloud, X } from 'lucide-react';
import { useRef, useState } from 'react';

type FileDropzoneProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
};

const allowedTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export default function FileDropzone({ file, onFileChange, disabled = false }: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function acceptFile(nextFile?: File) {
    if (!nextFile) return;
    const isAllowed = allowedTypes.includes(nextFile.type) || /\.(pdf|docx)$/i.test(nextFile.name);
    if (isAllowed) onFileChange(nextFile);
  }

  return (
    <div
      className={`rounded-2xl border-2 border-dashed p-7 transition ${
        dragging ? 'scale-[1.01] border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:bg-blue-50/40'
      } ${disabled ? 'opacity-70' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        if (!disabled) acceptFile(event.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(event) => acceptFile(event.target.files?.[0])}
        disabled={disabled}
      />

      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
          <UploadCloud className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-950">Upload your resume</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Drag and drop a PDF or DOCX file here, or choose a file from your device.
        </p>

        <button
          type="button"
          className="secondary-button mt-6"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
        >
          <FileText className="h-4 w-4" />
          Choose File
        </button>
      </div>

      {file && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{file.name}</p>
            <p className="mt-1 text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB selected</p>
          </div>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm hover:text-red-600"
            onClick={() => onFileChange(null)}
            disabled={disabled}
            aria-label="Remove selected file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
