#coding=utf-8
import sys
import io
import email
import mimetypes
# 把mht文件转为html文件
def doCall(file_name):
    mht = io.open(file_name, 'r', encoding='gbk')
    msg = email.message_from_file(mht)
    mht.close()
    file_path = file_name.replace('.mht', '')
    for part in msg.walk():
        if part.get_content_maintype() == 'multipart':
            continue
        filename = part.get_filename()
        if not filename:
            ext = mimetypes.guess_extension(part.get_content_type())
        if ext == '.html':
            try:
                result = part.get_payload(decode=True)
                #return result
                print(result.decode('utf-8'))
            except Exception as e:
                print(e)