import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { db, getDoc, doc } from '../firebaseConfig';

interface StudentData {
  name: string;
  enrollmentId: string;
  class?: string;
  section?: string;
  route?: string;
  stop?: string;
  parentName?: string;
  parentPhone?: string;
}

interface QRScannerProps {
  onScanSuccess?: (studentData: StudentData) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
    }, false);

    const success = async (decodedText: string) => {
      try {
        setMessage('Verifying student...');
        
        // Check if the enrollment ID exists in Firestore
        const studentRef = doc(db, 'students', decodedText);
        const studentDoc = await getDoc(studentRef);

        if (studentDoc.exists()) {
          const studentData = studentDoc.data() as StudentData;
          setMessage('Student verified successfully!');
          onScanSuccess?.(studentData);
        } else {
          setMessage('Student not found in database!');
          onScanError?.('Student not found');
        }
      } catch (error) {
        setMessage('Error verifying student');
        onScanError?.(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    const error = (error: string) => {
      setMessage('Error scanning QR code');
      onScanError?.(error);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div id="qr-reader" className="w-full max-w-md"></div>
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') ? 'bg-green-100 text-green-700' : 
          message.includes('Error') ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default QRScanner; 