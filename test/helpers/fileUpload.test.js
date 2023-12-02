import { v2 as cloudinary } from 'cloudinary'
const { fileUpload } = require("../../src/helpers/fileUpload");

cloudinary.config({ 
    cloud_name: 'dbv1dxddt', 
    api_key: '332268737758253', 
    api_secret: 'kwGSV0niu0xPPmJRKBoKGnSfm2s',
    secure: true
  });

describe("Pruebas en fileUpload", () => {
  test("should upload the file correly to cloudinary", async () => {
    const imageUrl = "https://st.depositphotos.com/1016440/2534/i/600/depositphotos_25344733-stock-photo-sunrise-at-the-beach.jpg";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "paisaje.jpg");
    const url = await fileUpload(file);
    expect(typeof url ).toBe('string');

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace('.webp','');
    //console.log(imageId);

    const cloudResp = await cloudinary.api.delete_resources(['journal/'+ imageId ],{
        resource_type: 'image'
    });
    //console.log(cloudResp);
  });

  test('should return null', async() => {
    const file = new File([], "paisaje.jpg");
    const url = await fileUpload(file);
    expect( url ).toBe(null);
  });
  
});
