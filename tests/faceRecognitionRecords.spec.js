import {test,expect} from "@playwright/test"


test("Face Recognition Records page test",async({page})=>{

  //login
    await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
    await page.locator("#pydLogin_txtUserid").fill(process.env.PYRAMID_USERNAME);
    await page.locator("#pydLogin_txtUserPwd").fill(process.env.PYRAMID_PASSWORD);
    await page.locator("#pydLogin_btnLogin").click()

    //Leave application -> face recognition records

    //side frame
    const leftFrame= page.frameLocator("frame[name='contents']")
    await leftFrame.locator("#PCIMenut50").click();
    await leftFrame.locator("#PCIMenut61").click();

    //main frame
    const mainFrame= page.frameLocator("frame[name='main']")
    await expect(mainFrame.locator(".header")).toHaveText("Face Recognition Records")

    await expect(mainFrame.locator("#BtnReport")).toBeEnabled()

    //Record for March
    const dropDownYear= mainFrame.locator("#ddlYear")
    await dropDownYear.click()
    await dropDownYear.selectOption({label:'2025'})

    const dropDownMonth= mainFrame.locator("#ddlMonth")
    await dropDownMonth.click()
    await dropDownMonth.selectOption({label:'March'})

    await mainFrame.locator("#BtnReport").click()


    const employeeName = mainFrame.locator("#tdName11569")
    await expect(employeeName).toHaveText('Mohanasubi Venkatachalapathy')
   
    const totalEntries = await mainFrame.locator("a[href='javascript:void(0)']").textContent()
    expect(totalEntries).toBe('21')

    //Record for April
    const MonthApril= mainFrame.locator("#ddlMonth")
    await MonthApril.click()
    await MonthApril.selectOption({label:'April'})

    await mainFrame.locator("#BtnReport").click()

    const totalEntriesApril = await mainFrame.locator("a[href='javascript:void(0)']").first()
   await expect(totalEntriesApril).toHaveText('12')

    //logout
    const topFrame= page.frameLocator("frame[name='top']")
    await topFrame.locator(".logout").click()
    await expect(page.locator("#pydLogin_lblMsg")).toContainText("You have been logged out successfully.")


})