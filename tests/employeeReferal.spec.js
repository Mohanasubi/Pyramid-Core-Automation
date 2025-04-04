import {test,expect} from "@playwright/test"


test("Employee referal test",async({page})=>{
  //login
    await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
    await page.locator("#pydLogin_txtUserid").fill(process.env.PYRAMID_USERNAME);
    await page.locator("#pydLogin_txtUserPwd").fill(process.env.PYRAMID_PASSWORD);
    await page.locator("#pydLogin_btnLogin").click()

    //Employee referal
    //side frame
    const leftFrame= page.frameLocator("frame[name='contents']")
    await leftFrame.locator("#PCIMenut3").click();

    //employee details - main frame
    const mainFrame= page.frameLocator("frame[name='main']")

    const dropDown= mainFrame.locator("[id='referredViewInput.CompanyId']")
    await dropDown.click()
    await dropDown.selectOption({label:'Celsior Technologies Pvt Ltd'})

   
    const dropDownDept= mainFrame.locator("[id='referredViewInput.DepartmentId']")
    await dropDownDept.click()
    await dropDownDept.selectOption({label:'<-Select->'})

    const dropDownDesignation= mainFrame.locator("[id='referredViewInput.DesignationId']")
    await dropDownDesignation.click()
    await dropDownDesignation.selectOption({label:'Other'})

    const dropDownLocation= mainFrame.locator("[id='referredViewInput.BranchId']")
    await dropDownLocation.click()
    await dropDownLocation.selectOption({label:'Noida'})

    await mainFrame.locator("#FirstName").fill('subi')

    await mainFrame.locator("#LastName").fill('venk')

    await mainFrame.locator("#Email").fill('subi@gmail.com')

    await mainFrame.locator("#ContactNo").fill("9873558736")

    //upload file
    const uploadFiles=  mainFrame.locator("[id='Document']")
  
    await uploadFiles.setInputFiles('tests/files.pdf');

    //submit
    await mainFrame.locator("#btnSave").click()

     //assertions
    const Message = mainFrame.locator(".notifier__notification-message"); 
    await expect(Message).toBeVisible();
    await expect(Message).toContainText("Please select referred department");

    await mainFrame.locator("//a[@title='Current Jobs']").click()
    await page.waitForTimeout(2000)
    await  expect( mainFrame.locator("//strong[normalize-space()='Data Analyst']")).toHaveText("Data Analyst")

    //logout
    const topFrame= page.frameLocator("frame[name='top']")
    await topFrame.locator(".logout").click()
    await expect(page.locator("#pydLogin_lblMsg")).toContainText("You have been logged out successfully.")

})