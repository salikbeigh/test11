import { QRCodeSVG } from 'qrcode.react';

const StudentVerification = () => {
  // Use the Vercel deployment URL
  const verificationUrl = 'https://transport-app-redesign.vercel.app/verify-student';

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Registration Check</h1>
        
        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <QRCodeSVG
              value={verificationUrl}
              size={300}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700 mb-2">
              Scan this QR code with your phone's camera
            </p>
            <p className="text-sm text-gray-600">
              This will take you to a page where you can check your registration status
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentVerification; 