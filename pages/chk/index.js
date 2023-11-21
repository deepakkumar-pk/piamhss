import React from 'react'
import Design from '@/components/VoucherDesign/Design';

const index = () => {
  return (
    <div style={{ width: "210mm", height: "297mm", pageBreakAfter: "always" }}>
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-center   ">
            <div className="">
              <Design

              />
            </div>
          </div>
          <div className="flex justify-center   ">
            <div className="">
              <Design
              />
            </div>
          </div>
          <div className="flex justify-center   ">
            <div className="">
              <Design
               
              />
            </div>
          </div>
          <div className="flex justify-center   ">
            <div className="">
              <Design
              
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index