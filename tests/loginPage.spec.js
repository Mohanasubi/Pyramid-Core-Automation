import {test,expect} from "@playwright/test"
import dotenv from 'dotenv';

dotenv.config();

test.describe("Login page validation",()=>{
test("Test with valid credentials",async({page})=>{
    await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
    await page.locator("#pydLogin_txtUserid").fill(process.env.PYRAMID_USERNAME);
    await page.locator("#pydLogin_txtUserPwd").fill(process.env.PYRAMID_PASSWORD);
    await page.locator("#pydLogin_btnLogin").click()
    await page.waitForTimeout(3000)
    await expect(page).toHaveURL("https://pyramidcore.pyramidci.com/Home/PCIhome.aspx")
})

test("Test with invalid credentials",async({page})=>{
    await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
    await page.locator("#pydLogin_txtUserid").fill(process.env.PYRAMID_WRONG_USERNAME);
    await page.locator("#pydLogin_txtUserPwd").fill(process.env.PYRAMID_WRONG_PASSWORD);
    await page.locator("#pydLogin_btnLogin").click()
    await expect(page.locator("#pydLogin_lblMsg")).toHaveText("* User not found")
})

test("Validating the links",async({page})=>{
    await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
    const emailLink=page.locator("//a[normalize-space()='oms-pyramid@pyramidconsultinginc.com']")
    await expect(emailLink).toBeVisible();

    await expect(page.locator("#pydLogin_lnkBtnSSOLogin")).toBeEnabled()
})

  test("validating the forgot password",async({page})=>{
    await page.goto("https://pyramidcore.pyramidci.com/Security/PCILoginNew.aspx")
    const forgotPassword = page.locator("//a[normalize-space()='Forgot Password']").click()
    const frame= page.frameLocator("iframe[src='PCIForget.aspx']") 
     await frame.locator("(//input[@id='txtemail'])[1]").fill(process.env.PYRAMID_USERNAME)
    await frame.locator("#btngo").click()
    await page.waitForTimeout(5000)
    await expect(frame.locator('#lbluser')).toHaveText('Security code has been sent to your registered email id. Please follow the email instructions for resetting your password.')
  })

})
