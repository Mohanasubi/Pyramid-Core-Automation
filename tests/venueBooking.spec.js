import {test,expect} from "@playwright/test"


test("Venue Booking",async({page})=>{
    //login
      await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
      await page.locator("#pydLogin_txtUserid").fill(process.env.PYRAMID_USERNAME);
      await page.locator("#pydLogin_txtUserPwd").fill(process.env.PYRAMID_PASSWORD);
      await page.locator("#pydLogin_btnLogin").click()
  
    //Venue booking

      //side frame
      const leftFrame= page.frameLocator("frame[name='contents']")
      await leftFrame.locator("#PCIMenut75").click();

     // mainframe
      const mainFrame= page.frameLocator("frame[name='main']")
      await expect(mainFrame.locator(".header")).toHaveText("Venue Booking")

      //show availability
      const availabilityBtn = mainFrame.locator("#btnShow")
      await expect(availabilityBtn).toBeEnabled()

      //New booking
     
      await mainFrame.locator("#txtdate").fill("4/4/2025");
      await mainFrame.locator("#ddlSlot").selectOption({ label: "06:00AM - 06.00PM" });

      await expect(mainFrame.locator("#btnNewBooking")).toBeEnabled()
      await mainFrame.locator("#btnNewBooking").click();
      await mainFrame.locator("#ddlItem").waitFor({ state: "visible" });
      await mainFrame.locator("#ddlItem").selectOption({ value: "30" });
  
     await mainFrame.locator("#fromDate").fill("4/4/2025");
     await mainFrame.locator("#toDate").fill("4/4/2025");

     const timeFrom = mainFrame.locator("#ddlFrmtime");
     await timeFrom.waitFor();
     await timeFrom.selectOption({ value: "4" });

     const timeTo = mainFrame.locator("#ddlTotime");
     await timeTo.waitFor();
     await timeTo.selectOption({ value: "14" }); 

     await mainFrame.locator("#txtPurpose").fill("testing")
     await mainFrame.locator("#btnAdd").click()

     await page.screenshot({path: 'screenshot.png'})

    //cancel booking
    const cancelBooking = mainFrame.locator("#btnCancelling")
    await expect(cancelBooking).toBeEnabled()
    await cancelBooking.click()
    await expect(mainFrame.locator("font[color='blue']")).toHaveText("No booking found for cancellation.")

})