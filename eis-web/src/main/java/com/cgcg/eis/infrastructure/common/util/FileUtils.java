package com.cgcg.eis.infrastructure.common.util;

import org.apache.commons.httpclient.util.DateUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;

public class FileUtils {
    private static final String front = "/image/front/";
    private static final String background = "/image/background/";

    public static String upload(MultipartFile multipartFile, String fileHome, String dirs) {
        String dir = fileHome;
        if (!fileHome.endsWith("/") || !fileHome.endsWith("\\")) {
            dir += "/";
        }
        dir += dirs + DateUtil.formatDate(new Date(), "yyyyMMdd") + "/";
        isChartPathExist(dir);
        final String name = multipartFile.getOriginalFilename();
        if (StringUtils.isBlank(name)) {
            return null;
        }
        final File file = new File(dir + name);
        try {
            multipartFile.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            return URLEncoder.encode(file.getPath(), "utf-8");
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }

    public static String upload(MultipartFile multipartFile, String fileHome) {
        return upload(multipartFile, fileHome, front);
    }

    public static String uploadBackground(MultipartFile multipartFile, String fileHome) {
        return upload(multipartFile, fileHome, background);
    }

    private static void isChartPathExist(String dirPath) {
        File file = new File(dirPath);
        if (!file.exists()) {
            file.mkdirs();
        }
    }
}
