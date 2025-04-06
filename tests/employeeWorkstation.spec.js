import {test,expect} from "@playwright/test"


test("Employee Workstation test",async({page})=>{

  //login
    await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
    await page.locator("#pydLogin_txtUserid").fill(process.env.PYRAMID_USERNAME);
    await page.locator("#pydLogin_txtUserPwd").fill(process.env.PYRAMID_PASSWORD);
    await page.locator("#pydLogin_btnLogin").click()

    //Employee workstation

    //side frame
    const leftFrame= page.frameLocator("frame[name='contents']")
    await leftFrame.locator("#PCIMenut65").click();
    await leftFrame.locator("#PCIMenut74").click();


    //employee details - main frame
    const mainFrame= page.frameLocator("frame[name='main']")
    await expect(mainFrame.locator(".header")).toHaveText("View Employee Workstation")

    await mainFrame.locator("#ename").fill("Mohanasubi")
    await mainFrame.locator("#essn").fill("CELNT0077")

    const searchBtn = mainFrame.locator("button.btn-success")

    await expect(searchBtn).toHaveText("Search");

    await expect(searchBtn).toBeVisible(); 
    await searchBtn.click(); 

    const supervisorCell = mainFrame.locator("div[col-id='SupervisorName'][role='gridcell']").first();
    await expect(supervisorCell).toHaveText("U Dhana Lakshmi");

    const shift= mainFrame.locator("div[col-id='EmpShiftName'][role='gridcell']").first();
    await expect(shift).toHaveText("Day Shift");

    //logout
    const topFrame= page.frameLocator("frame[name='top']")
    await topFrame.locator(".logout").click()
    await expect(page.locator("#pydLogin_lblMsg")).toContainText("You have been logged out successfully.")
   

})