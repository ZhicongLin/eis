package com.cgcg.eis.infrastructure.common.util;

import org.apache.commons.lang3.time.DateUtils;
import tool.util.DateUtil;

import java.util.Date;

public class TimeUtils {

    public static long getPlusTime(Integer day) {
        int i = 0;
        if (day != null) {
            i = day;
        }
        final Date date = new Date();
        DateUtil.getDayStartTime(DateUtils.addDays(date, -i));
        return DateUtil.getDayStartTime(DateUtils.addDays(date, -i)).getTime();
    }
}
