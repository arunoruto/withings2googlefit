# Withings to Google Fit (over IFTTT)

This project uzilizes the IFTTT integration of Withings to save the weight metrics and then upload the fat percentage to Google Fit. Every time new data is received, a sync is started. In case some data could not be synced, an error will be thrown and you will receive a notification from google scripts.

It has been heavily inspired by a [similar project](https://ithoughthecamewithyou.com/post/export-google-fit-daily-steps-to-a-google-sheet). You can easily extend it to sync up similar data, like blood pressure, temperature, etc.

If someone wants to extend it, please feel free to make a pull request.

# Install

- Link your Withings account with IFTTT and setup the automatic logging of weight data to a spreadsheet. Column `G` (synced status) and `H` (standard date) are used new columns added by me. `G` is used to see if the data has already been synced, so we can skip those entries. `H` is used if you intend also to plot the data in the sheet, since the default datetime follows no usual standard.

- Create a scripts project.

- Copy the content of the `.gs` files to google scripts and follow the instructions [here](https://ithoughthecamewithyou.com/post/export-google-fit-daily-steps-to-a-google-sheet) to obtain the needed IDs.

- Change the rest of the IDs. Also, create a new data bucket and remember its ID and save it. Also create an UID for the script, so you can always know from which device the data came.

- Setup an `onChange` trigger (for arriving data). If the data is not synced, I included a toolbar element for syncing unchecked data.

# Questions
If you have any questions, feel free to open an issue or you can comment on [this](https://www.reddit.com/r/withings/comments/pwhdir/body_not_scanning_body_fat_to_google_fit/) reddit post.
